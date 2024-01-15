package com.fcater.fcGames.controllers;

import com.fcater.fcGames.DTOs.GameDTO;
import com.fcater.fcGames.mappers.GameMapper;
import com.fcater.fcGames.mappers.UserGamesMapper;
import com.fcater.fcGames.mappers.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class UserGamesController {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private GameMapper gameMapper;
    @Autowired
    private UserGamesMapper userGamesMapper;

    private List<Integer> getGameIdsFromQuery(String gameId) {
        return gameId == null
                ? Collections.emptyList()
                : Arrays.stream(gameId.split(",")).map(Integer::parseInt).toList();
    }

    private BigDecimal getGamesAmount(List<Integer> gameIds) {
        return gameIds.stream().map(this::getGamePrice).reduce(BigDecimal::add).orElse(BigDecimal.ZERO);
    }

    private BigDecimal getGamePrice(int id) {
        return new GameDTO(gameMapper.selectById(id)).getDiscountedPrice();
    }

    @GetMapping("/userGames/{userId}")
    public ResponseEntity<?> getUserGamesByUserId(@PathVariable int userId) {
        var games = userGamesMapper.selectAllGames(userId);
        return ResponseEntity.ok(games);
    }

    @PostMapping("/userGames/{userId}")
    public ResponseEntity<?> insertUserGame(@PathVariable int userId, @RequestParam(required = false) String gameIds) {
        var userBalance = userMapper.getUserAccountBalance(userId);
        var _gameIds = getGameIdsFromQuery(gameIds);
        var gamesAmount = getGamesAmount(_gameIds);
        var accountBalance = userBalance.subtract(gamesAmount);

        if (accountBalance.compareTo(BigDecimal.ZERO) >= 0) {
            var user = userMapper.selectById(userId);
            user.setAccountBalance(accountBalance);
            userMapper.updateById(user);
            _gameIds.forEach(id -> userGamesMapper.insetGameForUser(userId, id));
            return ResponseEntity.ok("购买成功!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ID为" + userId + "的用户余额不足以购买");
        }
    }
}

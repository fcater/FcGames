package com.fcater.fcGames.controllers;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.fcater.fcGames.DTOs.GameDTO;
import com.fcater.fcGames.entities.Game;
import com.fcater.fcGames.enums.GameCategories;
import com.fcater.fcGames.mappers.GameMapper;
import org.apache.ibatis.jdbc.Null;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class GameController {
    @Autowired
    private GameMapper gameMapper;

    @GetMapping("/games")
    public List<GameDTO> getAllGames(@RequestParam(required = false) String categories) {
        QueryWrapper<Game> queryWrapper = new QueryWrapper<>();
        List<String> _categories = categories == null ? Collections.emptyList() : Arrays.asList(categories.split(","));
        if (!_categories.isEmpty()) queryWrapper.in("categories", _categories);

        return gameMapper.selectList(queryWrapper)
                .stream()
                .map(GameDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/games/categories")
    public GameCategories[] getAllGameCategories() {
        return GameCategories.values();
    }

    @GetMapping("/game/{id}")
    public ResponseEntity<?> getGameById(@PathVariable int id) {
        var game = gameMapper.selectById(id);
        return game != null
                ? ResponseEntity.ok(new GameDTO(game))
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("ID为" + id + "的游戏不存在");
    }

    @PostMapping("/games/add")
    public ResponseEntity<?> addGame(@RequestBody Game game) {
        var i = gameMapper.insert(game);
        return i > 0
                ? ResponseEntity.ok(new GameDTO(game))
                : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("游戏添加失败");
    }

    @PatchMapping("/game/{id}")
    public ResponseEntity<?> updateGameById(@PathVariable int id, @NotNull @RequestBody Game game) {
        game.setId(id);
        var i = gameMapper.updateById(game);
        return switch (i) {
            case 0 -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("ID为" + id + "的游戏不存在");
            case 1 -> ResponseEntity.ok(new GameDTO(gameMapper.selectById(id)));
            default -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("更新失败");
        };
    }

    @DeleteMapping("/game/{id}")
    public ResponseEntity<String> deleteGameById(@PathVariable int id) {
        int i = gameMapper.deleteById(id);
        return switch (i) {
            case 0 -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("ID为" + id + "的游戏不存在");
            case 1 -> ResponseEntity.ok("删除成功");
            default -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("删除失败");
        };
    }
}

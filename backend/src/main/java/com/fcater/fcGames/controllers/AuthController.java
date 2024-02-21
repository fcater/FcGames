package com.fcater.fcGames.controllers;

import com.fcater.fcGames.DTOs.UserDTO;
import com.fcater.fcGames.entities.User;
import com.fcater.fcGames.mappers.UserMapper;
import com.fcater.fcGames.utils.Auth;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.baomidou.mybatisplus.core.toolkit.Wrappers.lambdaQuery;


@RestController
public class AuthController {
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserController userController;

    @PostMapping("/login")
    public ResponseEntity<?> loginIn(@NotNull @RequestBody User user) {
        var query = userMapper.selectOne(lambdaQuery(User.class).eq(User::getUsername, user.getUsername()));
        var success = query != null && query.getPassword().equals(user.getPassword());

        return success ? ResponseEntity.ok(Auth.generateToken(new UserDTO(query))) : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("用户名或密码错误");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@NotNull @RequestBody User user) {
        var query = userMapper.selectOne(lambdaQuery(User.class).eq(User::getUsername, user.getUsername()));
        if (query != null) return ResponseEntity.status(HttpStatus.CONFLICT).body("用户名已存在");
        else {
            var newUser = userController.createUser(user);
            return newUser != null
                    ? ResponseEntity.ok(Auth.generateToken(newUser))
                    : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("用户创建失败");
        }
    }

    @GetMapping("/api/parseToken")
    public ResponseEntity<?> parseToken(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(Auth.parseToken(token).get("user"));
    }
}

package com.fcater.fcGames.controllers;

import com.fcater.fcGames.DTOs.UserDTO;
import com.fcater.fcGames.entities.User;
import com.fcater.fcGames.mappers.UserMapper;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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

        return success
                ? ResponseEntity.ok(new UserDTO(query))
                : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("用户名或密码错误");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@NotNull @RequestBody User user) {
        var query = userMapper.selectOne(lambdaQuery(User.class).eq(User::getUsername, user.getUsername()));
        return query != null
                ? ResponseEntity.status(HttpStatus.CONFLICT).body("用户名已存在")
                : userController.createUser(user);
    }
}

package com.fcater.fcGames.controllers;

import com.fcater.fcGames.DTOs.UserDTO;
import com.fcater.fcGames.entities.User;
import com.fcater.fcGames.mappers.UserMapper;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private UserMapper userMapper;

    private String authHeader;

    @GetMapping("/user")
    public List<UserDTO> getAllUsers() {
        return userMapper.selectList(null)
                .stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }


    @GetMapping("/user/{id}")
    public UserDTO getUserById(@PathVariable int id) {
        return new UserDTO(userMapper.selectById(id));
    }

    @PostMapping("/user")
    public ResponseEntity<?> createUser(User user) {
        user.setIsAdmin(getAllUsers().isEmpty());
        var i = userMapper.insert(user);
        return i > 0
                ? ResponseEntity.ok(new UserDTO(user))
                : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("用户创建失败");
    }

    @PatchMapping("/user/{id}")
    public UserDTO updateUserById(@PathVariable int id, @NotNull @RequestBody User user) {
        user.setId(id);
        var origin = userMapper.selectById(id);
        if (!origin.getIsAdmin()) {
            user.setIsAdmin(false);
        }
        var i = userMapper.updateById(user);
        return i > 0 ? new UserDTO(user) : null;
    }

    @DeleteMapping("/user/{id}")
    public String deleteUserById(@PathVariable int id) {
        int i = userMapper.deleteById(id);
        return i > 0 ? "删除成功" : "删除失败";
    }
}

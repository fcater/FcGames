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

    @GetMapping("/user")
    public List<UserDTO> getAllUsers() {
        return userMapper.selectList(null)
                .stream()
                .map(UserDTO::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable int id) {
        var user = userMapper.selectById(id);
        return user != null
                ? ResponseEntity.ok(new UserDTO(user))
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("ID为" + id + "的用户不存在");
    }

    @PostMapping("/user")
    public ResponseEntity<?> createUser(@NotNull User user) {
        user.setIsAdmin(getAllUsers().isEmpty());
        var i = userMapper.insert(user);
        return i > 0
                ? ResponseEntity.ok(new UserDTO(user))
                : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("用户创建失败");
    }

    @PatchMapping("/user/{id}")
    public ResponseEntity<?> updateUserById(@PathVariable int id, @NotNull @RequestBody User user) {
        user.setId(id);
        var origin = userMapper.selectById(id);
        if (!origin.getIsAdmin()) user.setIsAdmin(false);

        var i = userMapper.updateById(user);
        return switch (i) {
            case 0 -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("ID为" + id + "的用户不存在");
            case 1 -> ResponseEntity.ok(new UserDTO(userMapper.selectById(id)));
            default -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("更新失败");
        };
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable int id) {

        int i = userMapper.deleteById(id);
        return switch (i) {
            case 0 -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("ID为" + id + "的游戏不存在");
            case 1 -> ResponseEntity.ok("删除成功");
            default -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("删除失败");
        };
    }
}

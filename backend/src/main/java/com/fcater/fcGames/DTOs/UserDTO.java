package com.fcater.fcGames.DTOs;

import com.fcater.fcGames.entities.User;
import com.fcater.fcGames.utils.Auth;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
public class UserDTO {

    private int id;
    private String username;
    private Boolean isAdmin;
    private BigDecimal accountBalance;
    private String token;

    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.isAdmin = user.getIsAdmin();
        this.accountBalance = user.getAccountBalance();
        this.token = Auth.generateToken(user);
    }
}
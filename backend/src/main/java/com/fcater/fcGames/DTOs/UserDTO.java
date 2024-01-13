package com.fcater.fcGames.DTOs;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fcater.fcGames.entities.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.math.BigDecimal;

@Getter
@Setter
@ToString
public class UserDTO {

    private int id;
    private String username;
    private Boolean isAdmin;
    private BigDecimal accountBalance;

    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.isAdmin = user.getIsAdmin();
        this.accountBalance = user.getAccountBalance();
    }
}
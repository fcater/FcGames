package com.fcater.fcGames.entities;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@Setter
@TableName("users")
@ToString()
public class User {
    @TableId(type = IdType.AUTO)
    private int id;
    private String username;
    private String password;
    private Boolean isAdmin;
    private BigDecimal accountBalance = BigDecimal.ZERO;
}

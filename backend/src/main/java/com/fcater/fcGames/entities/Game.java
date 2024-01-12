package com.fcater.fcGames.entities;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fcater.fcGames.enums.GameCategories;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.math.RoundingMode;


@Getter
@Setter
@TableName("games")
@ToString()
public class Game {
    @TableId(type = IdType.AUTO)
    private int id;
    private String title;
    private String poster;
    private String description;
    private GameCategories categories;
    private BigDecimal price = BigDecimal.valueOf(0);
    private BigDecimal discount = BigDecimal.valueOf(1);

    public BigDecimal calculatePrice() {
        return this.price.multiply(BigDecimal.ONE.subtract(this.discount)).setScale(2, RoundingMode.HALF_UP);
    }
}

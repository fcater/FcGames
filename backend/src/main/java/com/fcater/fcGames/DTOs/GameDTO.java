package com.fcater.fcGames.DTOs;

import com.fcater.fcGames.entities.Game;
import com.fcater.fcGames.enums.GameCategories;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.jetbrains.annotations.NotNull;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
public class GameDTO {
    private int id;
    private String title;
    private String poster;
    private String description;
    private GameCategories categories;
    private BigDecimal price;
    private BigDecimal discount;
    private BigDecimal discountedPrice;

    public GameDTO(@NotNull Game game) {
        this.id = game.getId();
        this.title = game.getTitle();
        this.poster = game.getPoster();
        this.description = game.getDescription();
        this.categories = game.getCategories();
        this.price = game.getPrice();
        this.discountedPrice = game.calculatePrice();
        this.discount = game.getDiscount();
    }

}
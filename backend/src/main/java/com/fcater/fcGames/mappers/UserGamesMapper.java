package com.fcater.fcGames.mappers;

import com.fcater.fcGames.entities.Game;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface UserGamesMapper {
    @Insert("""
            INSERT INTO user_games (user_id, game_id)
            VALUES (#{userId}, #{gameId})
            """)
    void insetGameForUser(int userId, int gameId);

    @Select("""
            SELECT games.*
            FROM user_games
            JOIN games ON user_games.game_id = games.id
            WHERE user_games.user_id = #{userId}
            """)
    List<Game> selectAllGames(int userId);
}

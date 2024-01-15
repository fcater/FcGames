package com.fcater.fcGames.mappers;

import java.math.BigDecimal;
import com.fcater.fcGames.entities.User;
import org.apache.ibatis.annotations.Select;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

public interface UserMapper extends BaseMapper<User> {
    @Select("SELECT account_balance FROM users WHERE id = #{userId}")
    BigDecimal getUserAccountBalance(int userId);
}

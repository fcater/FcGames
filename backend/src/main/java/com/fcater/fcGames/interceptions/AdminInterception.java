package com.fcater.fcGames.interceptions;

import com.fcater.fcGames.utils.Auth;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.servlet.HandlerInterceptor;

public class AdminInterception implements HandlerInterceptor {

    @Override
    public boolean preHandle(@NotNull HttpServletRequest request, @NotNull HttpServletResponse response, @NotNull Object handler) {
        String token = request.getHeader("Authorization");
        try {
            if (!(boolean) Auth.parseToken(token).get("isAdmin")) throw new Exception();
            return true;
        } catch (Exception e) {
            Auth.sendUnauthorizedResponse(response, "只有管理员可以管理用户！");
            return false;
        }
    }
}

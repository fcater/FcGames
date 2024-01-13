package com.fcater.fcGames.interceptions;

import com.fcater.fcGames.utils.Auth;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.servlet.HandlerInterceptor;


public class AuthInterception implements HandlerInterceptor {

    @Override
    public boolean preHandle(
            @NotNull HttpServletRequest request,
            @NotNull HttpServletResponse response,
            @NotNull Object handler
    ) {
        String token = request.getHeader("Authorization");
        try {
            Auth.parseToken(token);
            return true;
        } catch (Exception e) {
            Auth.sendUnauthorizedResponse(response, "未授权用户！");
            return false;
        }
    }
}

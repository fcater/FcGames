package com.fcater.fcGames.interceptions;

import com.fcater.fcGames.utils.Auth;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.List;

public class AdminInterception implements HandlerInterceptor {

    private final List<String> whiteList = List.of("user", "game");

    @Override
    public boolean preHandle(@NotNull HttpServletRequest request, @NotNull HttpServletResponse response, @NotNull Object handler) {
        var method = request.getMethod();
        var URI = request.getRequestURI();
        var token = request.getHeader("Authorization");
        if ("GET".equals(method) && whiteList.stream().anyMatch(URI::contains)) return true;
        try {
            if (!(boolean) Auth.parseToken(token).get("isAdmin")) throw new Exception();
            return true;
        } catch (Exception e) {
            Auth.sendUnauthorizedResponse(response, "只有管理员可以进行此操作！");
            return false;
        }
    }
}

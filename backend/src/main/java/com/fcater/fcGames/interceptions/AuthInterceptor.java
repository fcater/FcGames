package com.fcater.fcGames.interceptions;

import com.fcater.fcGames.utils.JWT;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.web.servlet.HandlerInterceptor;


public class AuthInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(
            @NotNull HttpServletRequest request,
            @NotNull HttpServletResponse response,
            @NotNull Object handler
    ) {
        String token = request.getHeader("Authorization");

        // TODO: 记得移掉这行代码，否则权限校验会失效
//        if (token == null) return true;
        if (JWT.isValidJWT(token)) {
            return true;
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
    }
}

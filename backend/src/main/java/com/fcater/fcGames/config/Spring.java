package com.fcater.fcGames.config;

import com.fcater.fcGames.interceptions.AdminInterception;
import com.fcater.fcGames.interceptions.AuthInterception;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class Spring implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new AuthInterception()).addPathPatterns("/api/**");
        registry.addInterceptor(new AdminInterception()).addPathPatterns("/api/user/**", "/api/game/**");
    }
}

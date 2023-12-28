package com.fcater.fcGames;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.fcater.fcGames.mappers")
public class FcGamesApplication {

	public static void main(String[] args) {
		SpringApplication.run(FcGamesApplication.class, args);
	}

}

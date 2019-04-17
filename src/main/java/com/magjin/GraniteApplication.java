package com.magjin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GraniteApplication {

	public static void main(String[] args) throws Exception {
		initLocalDb();

		SpringApplication.run(GraniteApplication.class, args);
	}

	private static void initLocalDb() {

	}
}

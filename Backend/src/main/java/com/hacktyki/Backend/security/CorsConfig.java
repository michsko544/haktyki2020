package com.hacktyki.Backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/orders/**").allowedOrigins("http://localhost:3000"
                                                                    ,"https://teamfood-env-develop.herokuapp.com"
                                                                    ,"https://teamfood-env-production.herokuapp.com")
                                                    .allowedMethods("GET","POST")
                                                    .maxAge(3600);
                registry.addMapping("/users/**").allowedOrigins("http://localhost:3000"
                        ,"https://teamfood-env-develop.herokuapp.com"
                        ,"https://teamfood-env-production.herokuapp.com")
                        .allowedMethods("GET","POST")
                        .maxAge(3600);
                registry.addMapping("/login").allowedOrigins("http://localhost:3000"
                        ,"https://teamfood-env-develop.herokuapp.com"
                        ,"https://teamfood-env-production.herokuapp.com")
                        .allowedMethods("GET","POST")
                        .maxAge(3600);
                registry.addMapping("/register").allowedOrigins("http://localhost:3000"
                        ,"https://teamfood-env-develop.herokuapp.com"
                        ,"https://teamfood-env-production.herokuapp.com")
                        .allowedMethods("GET","POST")
                        .maxAge(3600);
                registry.addMapping("/**").allowedOrigins("*")
                        .allowedMethods("GET","POST")
                        .maxAge(3600);

            }
        };
    }
}

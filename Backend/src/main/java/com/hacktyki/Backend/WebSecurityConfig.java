package com.hacktyki.Backend;

import com.hacktyki.Backend.utils.JwtFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        http//.authorizeRequests().antMatchers("/login").permitAll()
            //.antMatchers("/register").permitAll()
            //.and()
            //.authorizeRequests().antMatchers("/users/").hasRole("USER")
            //.and()
            //.addFilter(new JwtFilter(authenticationManager()))
            .csrf().disable();
    }

}


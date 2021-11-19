package com.cognizant.utils;

import lombok.experimental.UtilityClass;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

@UtilityClass
public class SecurityUtils {

    public String getUserEmail() {
        return String.valueOf(((Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getClaims()
                .get("http://cognizant.com/email"));
    }
}

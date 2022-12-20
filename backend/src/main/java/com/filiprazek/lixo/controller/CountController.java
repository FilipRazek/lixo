package com.filiprazek.lixo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "*")
public class CountController {
    @GetMapping("/getcount")
    public int getCount() {
        return 364;
    }
}
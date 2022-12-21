package com.filiprazek.lixo.controller;

import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("count")
@CrossOrigin(origins = "*")
public class CountController {

  Logger logger = Logger.getLogger(CountController.class.getName());

  @GetMapping
  public String getCount() {
    return "364";
  }

  @PostMapping
  public void setCount(@RequestBody String newCount) {
    logger.log(Level.INFO, newCount);
  }
}

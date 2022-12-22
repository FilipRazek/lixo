package com.filiprazek.lixo.controller;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.filiprazek.lixo.data.Game;
import com.filiprazek.lixo.service.GameService;

@RestController
@RequestMapping("game")
@CrossOrigin(origins = "*")
public class GameController {

  @Autowired
  private GameService gameService;

  @GetMapping("/{id}")
  public Game get(@PathVariable String id) {
    return this.gameService.findById(id);
  }

  @PostMapping("/{id}")
  public Game move(@PathVariable String id, @RequestBody String move) {
    return this.gameService.move(id, Integer.parseInt(move));
  }

  @PostMapping("new")
  public String startNew() {
    Game newGame = this.gameService.newGame();
    return newGame.getId();
  }
}

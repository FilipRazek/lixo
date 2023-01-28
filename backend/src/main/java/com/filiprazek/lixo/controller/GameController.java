package com.filiprazek.lixo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.filiprazek.lixo.dto.GameDto;
import com.filiprazek.lixo.dto.MoveDto;
import com.filiprazek.lixo.entities.GameEntity;
import com.filiprazek.lixo.service.GameService;

@RestController
@RequestMapping("game")
@CrossOrigin(origins = "*")
public class GameController {

  @Autowired
  private GameService gameService;

  @GetMapping("/{id}")
  public GameDto get(@PathVariable String id) {
    GameEntity gameEntity = this.gameService.findEntityById(id);
    return new GameDto(gameEntity.id, gameEntity.board, gameEntity.colorToPlay, gameEntity.isWon);
  }

  @PostMapping("/{id}")
  public GameDto move(@PathVariable String id, @RequestBody MoveDto data) {
    GameEntity gameEntity = this.gameService.move(id, Integer.parseInt(data.move));
    return new GameDto(gameEntity.id, gameEntity.board, gameEntity.colorToPlay, gameEntity.isWon);
  }

  @GetMapping("all")
  public List<String> getAllIds() {
    return this.gameService.getAllIds();
  }

  @PostMapping("new")
  public String startNew() {
    return this.gameService.newGame().getId();
  }
}

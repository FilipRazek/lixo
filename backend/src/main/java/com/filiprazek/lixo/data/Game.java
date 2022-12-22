package com.filiprazek.lixo.data;

import org.springframework.data.annotation.Id;

public class Game {

  @Id
  private String id;

  private int board;

  public Game() {
    this.board = 0;
  }

  public int getBoard() {
    return this.board;
  }

  public String getId() {
    return this.id;
  }

  public void setBoard(int newBoard) {
    this.board = newBoard;
  }
}

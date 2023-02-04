package com.filiprazek.lixo.data;

import org.springframework.data.annotation.Id;

public class Game {

  @Id
  private String id;

  private int board;

  private String player1Token;

  private String player2Token;

  public Game() {
    this.board = 0;
    this.player1Token = "";
    this.player2Token = "";
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

  public void setPlayer1Token(String token) {
    if (!this.hasPlayer1Token()) {
      this.player1Token = token;
    }
  }

  public void setPlayer2Token(String token) {
    if (!this.hasPlayer2Token()) {
      this.player2Token = token;
    }
  }

  public boolean hasPlayer1Token() {
    return this.player1Token != "";
  }

  public boolean hasPlayer2Token() {
    return this.player2Token != "";
  }

  public boolean checkPlayer1Token(String token) {
    return this.player1Token == token;
  }

  public boolean checkPlayer2Token(String token) {
    return this.player2Token == token;
  }
}

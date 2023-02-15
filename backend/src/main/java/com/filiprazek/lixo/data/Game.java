package com.filiprazek.lixo.data;

import org.springframework.data.annotation.Id;

import org.mindrot.jbcrypt.BCrypt;

public class Game {

  @Id
  private String id;

  private int board;

  private String player1Hash;

  private String player2Hash;

  public Game() {
    this.board = 0;
    this.player1Hash = null;
    this.player2Hash = null;
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
    if (!this.hasPlayer1()) {
      String hash = BCrypt.hashpw(token, BCrypt.gensalt());
      this.player1Hash = hash;
    }
  }

  public void setPlayer2Token(String token) {
    if (!this.hasPlayer2()) {
      String hash = BCrypt.hashpw(token, BCrypt.gensalt());
      this.player2Hash = hash;
    }
  }

  public boolean hasPlayer1() {
    return this.player1Hash != null;
  }

  public boolean hasPlayer2() {
    return this.player2Hash != null;
  }

  public boolean checkPlayer1Token(String token) {
    return BCrypt.checkpw(token, this.player1Hash);
  }

  public boolean checkPlayer2Token(String token) {
    return BCrypt.checkpw(token, this.player2Hash);
  }
}

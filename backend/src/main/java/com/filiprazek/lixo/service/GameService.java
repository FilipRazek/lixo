package com.filiprazek.lixo.service;

import com.filiprazek.lixo.data.Game;
import com.filiprazek.lixo.exception.EntityNotFoundException;
import com.filiprazek.lixo.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    public Game findById(String id) {
        return gameRepository.findById(id).orElseThrow(EntityNotFoundException::new);
    }

    public Game save(Game game) {
        return gameRepository.save(game);
    }

    public Game newGame() {
        return gameRepository.save(new Game());
    }

    public Game move(String id, int move) {
        Game game = this.findById(id);
        game.setBoard(move);
        return gameRepository.save(game);
    }
}

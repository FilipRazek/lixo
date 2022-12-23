package com.filiprazek.lixo.service;

import com.filiprazek.lixo.data.Game;
import com.filiprazek.lixo.exception.EntityNotFoundException;
import com.filiprazek.lixo.exception.InvalidMoveException;
import com.filiprazek.lixo.repository.GameRepository;

import java.util.ArrayList;
import java.util.List;

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
        int board = game.getBoard();

        List<Integer> cellValues = new ArrayList<>();
        int totalCellValue = 0;

        for (int cell = 0; cell < 9; cell++) {
            // Cell value is given by the ternary decomposition of board
            int cellValue = (int) Math.floor(board / Math.pow(3, cell)) % 3;
            cellValues.add(cellValue);
            totalCellValue += cellValue;
        }

        boolean canBePlayed = cellValues.get(move) == 0;
        if (!canBePlayed) {
            throw new InvalidMoveException();
        }

        // First player is 1,then 2
        int player = totalCellValue % 3 == 0 ? 1 : 2;
        int newBoard = board + player * (int)Math.pow(3, move);

        game.setBoard(newBoard);
        return gameRepository.save(game);
    }
}

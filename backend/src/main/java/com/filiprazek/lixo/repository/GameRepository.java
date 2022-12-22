package com.filiprazek.lixo.repository;

import com.filiprazek.lixo.data.Game;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GameRepository extends MongoRepository<Game, String> {}

package com.kosta.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kosta.entity.ImageFile;
import com.kosta.entity.Post;

@Repository
public interface ImageFileRepository extends JpaRepository<ImageFile, Long> {
	
	

}

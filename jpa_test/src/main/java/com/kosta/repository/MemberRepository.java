package com.kosta.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.kosta.entity.User;

@Repository
public interface MemberRepository extends JpaRepository<User, Long> {

	List<User> findByNameContains(String keyword);


}

package com.kosta.domain;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorResponse {
	
	private int statusCode;
	private String message;
	private String url;
	private String details;
	
}

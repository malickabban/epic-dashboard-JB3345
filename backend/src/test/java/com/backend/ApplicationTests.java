package com.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import static org.assertj.core.api.Assertions.assertThat;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;



@SpringBootTest
@AutoConfigureMockMvc
class ApplicationTests {


	@Autowired
	private MockMvc mockMvc;

	@Test
	void shouldReturnDefaultMessage() throws Exception {
		this.mockMvc.perform(get("/api/getPatients")).andDo(print()).andExpect(status().isOk());
	}


}



// @SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
// class HttpRequestTest {

// 	@LocalServerPort
// 	private int port;

// 	@Autowired
// 	private TestRestTemplate restTemplate;

// 	@Test
// 	void greetingShouldReturnDefaultMessage() throws Exception {
// 		assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/",
// 				String.class)).contains("Hello, World");
// 	}
// }

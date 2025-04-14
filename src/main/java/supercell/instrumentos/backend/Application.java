package supercell.instrumentos.backend;

import java.time.LocalDate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
				System.out.println("BACKEND INITIALIZED AT: " + LocalDate.now());
	}

}

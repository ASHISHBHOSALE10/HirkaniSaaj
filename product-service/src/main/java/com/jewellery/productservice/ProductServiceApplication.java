package com.jewellery.productservice;

import com.jewellery.productservice.entity.Category;
import com.jewellery.productservice.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;

@SpringBootApplication
@EnableDiscoveryClient
public class ProductServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductServiceApplication.class, args);
    }

    @Bean
    public CommandLineRunner dataLoader(CategoryRepository categoryRepository) {
        return args -> {
            if (categoryRepository.count() == 0) {
                Arrays.asList("Rings", "Necklaces", "Earrings", "Bracelets", "Bangles", "Pendants")
                        .forEach(name -> categoryRepository.save(Category.builder().name(name).description(name + " category").build()));
            }
        };
    }
}

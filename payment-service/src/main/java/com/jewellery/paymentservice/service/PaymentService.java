package com.jewellery.paymentservice.service;

import com.jewellery.paymentservice.config.RabbitMQConfig;
import com.jewellery.paymentservice.dto.PaymentRequest;
import com.jewellery.paymentservice.entity.Payment;
import com.jewellery.paymentservice.entity.PaymentStatus;
import com.jewellery.paymentservice.event.PaymentSuccessEvent;
import com.jewellery.paymentservice.repository.PaymentRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public Payment processPayment(PaymentRequest request) {
        // Simulate payment processing (80% success rate)
        boolean isSuccess = Math.random() < 0.8;
        
        Payment payment = Payment.builder()
                .orderId(request.getOrderId())
                .userId(request.getUserId())
                .amount(request.getAmount())
                .status(isSuccess ? PaymentStatus.SUCCESS : PaymentStatus.FAILED)
                .transactionId(UUID.randomUUID().toString())
                .paidAt(isSuccess ? LocalDateTime.now() : null)
                .build();

        Payment savedPayment = paymentRepository.save(payment);

        if (isSuccess) {
            // Publish event to RabbitMQ
            rabbitTemplate.convertAndSend(RabbitMQConfig.PAYMENT_SUCCESS_QUEUE,
                    new PaymentSuccessEvent(savedPayment.getOrderId(), savedPayment.getUserId(), savedPayment.getTransactionId()));
        }

        return savedPayment;
    }

    public Payment getPaymentByOrderId(Long orderId) {
        return paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment not found for order id: " + orderId));
    }
}

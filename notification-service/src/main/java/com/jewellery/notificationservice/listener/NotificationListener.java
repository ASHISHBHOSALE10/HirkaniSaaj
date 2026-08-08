package com.jewellery.notificationservice.listener;

import com.jewellery.notificationservice.config.RabbitMQConfig;
import com.jewellery.notificationservice.event.OrderPlacedEvent;
import com.jewellery.notificationservice.event.PaymentSuccessEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationListener {

    private static final Logger log = LoggerFactory.getLogger(NotificationListener.class);

    @RabbitListener(queues = RabbitMQConfig.ORDER_PLACED_QUEUE)
    public void handleOrderPlaced(OrderPlacedEvent event) {
        log.info("Order #{} placed for user #{} - sending confirmation email", event.getOrderId(), event.getUserId());
    }

    @RabbitListener(queues = RabbitMQConfig.PAYMENT_SUCCESS_QUEUE)
    public void handlePaymentSuccess(PaymentSuccessEvent event) {
        log.info("Payment successful for order #{} - sending receipt email", event.getOrderId());
    }
}

package com.hacktyki.Backend.model.entity;

import com.hacktyki.Backend.utils.PaymentFormEnum;
import org.hibernate.annotations.Immutable;

import javax.persistence.*;

@Entity
@Immutable
@Table(name = "payment_form")
public class PaymentFormEntity {

    @Id
    private long id;
    @Enumerated(EnumType.STRING)
    @Column(name = "payment_form_name")
    private PaymentFormEnum paymentFormName;

    public PaymentFormEntity() {
    }

    public long getId() {
        return id;
    }

    public PaymentFormEnum getPaymentFormName() {
        return paymentFormName;
    }
}

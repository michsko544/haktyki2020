package com.hacktyki.Backend.utils;

public enum PaymentFormEnum {
    TRANSFER(1),
    BLIK(2),
    CASH(3);

    private final long value;

    PaymentFormEnum(final long newValue) {
        value = newValue;
    }

    public long getValue() { return value; }
}

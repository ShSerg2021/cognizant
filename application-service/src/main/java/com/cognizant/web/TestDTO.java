package com.cognizant.web;

import lombok.Value;

@Value(staticConstructor = "of")
public class TestDTO {

    String server;

    int port;

    int counter;

}

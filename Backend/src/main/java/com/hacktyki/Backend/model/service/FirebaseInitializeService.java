package com.hacktyki.Backend.model.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;

@Service
public class FirebaseInitializeService {

    private Logger logger;

    @PostConstruct
    private void initialize() {
        logger = LoggerFactory.getLogger(FirebaseInitializeService.class);
        try {
            FileInputStream serviceAccount =
                    new FileInputStream("src/main/resources/google/hacktyki2020-firebase-adminsdk-qzzfz-181232da7b.json");

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl("https://hacktyki2020.firebaseio.com")
                    .build();

            FirebaseApp.initializeApp(options);

        }
        catch(IOException ex){
            logger.error("Create firebase app error ", ex);
        }
        catch(Exception ex){
            logger.error("Unhandled Error while firebase app was initializing", ex);
        }

    }

}

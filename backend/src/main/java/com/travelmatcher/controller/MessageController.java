package com.travelmatcher.controller;

import com.travelmatcher.model.Message;
import com.travelmatcher.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*", allowCredentials = "true")
public class MessageController {
    @Autowired
    private MessageService messageService;

    @GetMapping("/{matchId}")
    public List<Message> getMessages(@PathVariable Long matchId, Principal principal) {
        return messageService.getMessagesByMatchId(matchId);
    }

    @PostMapping("/{matchId}")
    public Message sendMessage(@PathVariable Long matchId, @RequestBody MessageRequest request, Principal principal) {
        return messageService.sendMessage(matchId, principal.getName(), request.getMessage());
    }

    static class MessageRequest {
        private String message;

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
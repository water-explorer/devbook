package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Notification struct {
	UserID  string `json:"userId"`
	Message string `json:"message"`
}

func sendNotification(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

	var n Notification
	if err := json.NewDecoder(r.Body).Decode(&n); err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	log.Printf("📩 Notifying user %s: %s", n.UserID, n.Message)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"status": "sent"})
}

func main() {
	http.HandleFunc("/notify", sendNotification)
	log.Println("🚀 Notifications service running on port 6000")
	log.Fatal(http.ListenAndServe(":6000", nil))
}

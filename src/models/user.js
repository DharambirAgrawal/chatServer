

Users Collection={
    "_id": ObjectId("message_id"),  // Unique message ID
    "chat_id": ObjectId("chat_id"),  // Reference to the chat this message belongs to
    "sender_id": ObjectId("user_id"),  // Reference to the user who sent the message
    "message_type": "text" | "image" | "video" | "audio" | "file", // Type of message
    "content": "Hello, how are you?", // Text content or URL to media if it's not a text message
    "media_url": "url_to_media_file", // URL to the media file (if the message contains media)
    "status": "sent" | "delivered" | "read",  // Status of the message
    "timestamp": ISODate("2024-11-23T15:00:00Z"), // Time the message was sent
    "edited": false,                // Flag to indicate if the message was edited
    "replied_to": ObjectId("message_id") // Optional: Reference to the message being replied to
  }

  Chats Collection={
    "_id": ObjectId("media_id"), // Unique media ID
    "message_id": ObjectId("message_id"),  // Reference to the message that contains the media
    "file_type": "image" | "video" | "audio", // Type of media
    "file_url": "url_to_media_file",  // URL to the media file
    "size": 1024,                    // File size in bytes
    "uploaded_at": ISODate("2024-11-23T15:00:00Z"),  // Upload timestamp
    "sender_id": ObjectId("user_id")  // User who sent the media
  }

  Messages Collection={
    "_id": ObjectId("contact_id"),   // Unique ID for the contact entry
    "user_id": ObjectId("user_id"),   // Reference to the user
    "contact_id": ObjectId("contact_user_id"),  // Reference to the contact
    "contact_status": "pending" | "accepted" | "blocked", // The status of the relationship
    "added_at": ISODate("2024-01-01T00:00:00Z") // When the contact was added
  }

  Media Collection={
    "_id": ObjectId("notification_id"),  // Unique notification ID
    "user_id": ObjectId("user_id"),  // User receiving the notification
    "type": "message" | "friend_request" | "mention" | "other",  // Type of notification
    "content": "You have a new message", // Content of the notification
    "link": "/chat/12345",  // URL link to navigate to the relevant screen (like a specific chat)
    "read_status": false,   // Whether the user has read the notification
    "timestamp": ISODate("2024-11-23T15:00:00Z")  // Time when the notification was created
  }
  
  
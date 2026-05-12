<template>
  <section class="comment-section">
    <h3>Comments ({{ comments.length }})</h3>

    <div class="comment-form">
      <h4>Leave a Comment</h4>
      <form @submit.prevent="submitComment">
        <input v-model="newComment.name" type="text" placeholder="Your Name" required />
        <input v-model="newComment.email" type="email" placeholder="Your Email" required />
        <textarea v-model="newComment.text" placeholder="Your Comment" rows="4" required></textarea>
        <button type="submit" class="btn-submit">Post Comment</button>
      </form>
    </div>

    <div class="comments-list">
      <div v-for="comment in comments" :key="comment.id" class="comment">
        <div class="comment-header">
          <strong>{{ comment.name }}</strong>
          <span class="comment-date">{{ formatDate(comment.date) }}</span>
        </div>
        <p class="comment-text">{{ comment.text }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CommentSection',
  data() {
    return {
      comments: [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          text: 'Great article! Very informative.',
          date: '2024-01-01',
        },
        {
          id: 2,
          name: 'Jane Smith',
          email: 'jane@example.com',
          text: 'Thanks for sharing this information.',
          date: '2024-01-02',
        },
      ],
      newComment: {
        name: '',
        email: '',
        text: '',
      },
    };
  },
  methods: {
    submitComment() {
      if (this.newComment.name && this.newComment.email && this.newComment.text) {
        this.comments.push({
          id: this.comments.length + 1,
          ...this.newComment,
          date: new Date().toISOString().split('T')[0],
        });
        this.newComment = { name: '', email: '', text: '' };
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
};
</script>

<style scoped>
.comment-section {
  background: white;
  padding: 32px;
  border-radius: 16px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
}

.comment-section h3 {
  font-size: 24px;
  margin-bottom: 24px;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin-top: 0;
}

.comment-form {
  background: var(--bg-light);
  padding: 24px;
  border-radius: var(--border-radius);
  margin-bottom: 32px;
}

.comment-form h4 {
  margin-bottom: 16px;
  font-weight: 700;
  color: var(--text-primary);
  font-size: 16px;
  margin-top: 0;
}

.comment-form input,
.comment-form textarea {
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 16px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-family: inherit;
  font-size: 14px;
  color: var(--text-primary);
  background: white;
  transition: border-color var(--transition-speed) ease;
}

.comment-form input:focus,
.comment-form textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
}

.comment-form textarea {
  resize: vertical;
  min-height: 120px;
}

.btn-submit {
  background-color: var(--primary-color);
  color: white;
  padding: 12px 28px;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  transition: all var(--transition-speed) ease;
  font-size: 14px;
}

.btn-submit:hover {
  background-color: #1e3a8a;
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment {
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--bg-light);
  transition: all var(--transition-speed) ease;
}

.comment:hover {
  border-color: var(--primary-color);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.comment-header strong {
  color: var(--text-primary);
  font-size: 15px;
  margin: 0;
}

.comment-date {
  color: var(--text-secondary);
  font-size: 13px;
}

.comment-text {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 14px;
  margin: 0;
}

@media (max-width: 768px) {
  .comment-section {
    padding: 24px;
  }

  .comment-form {
    padding: 16px;
  }

  .comment {
    padding: 16px;
  }

  .comment-section h3 {
    font-size: 20px;
  }
}

@media (max-width: 576px) {
  .comment-section {
    padding: 16px;
  }

  .comment-section h3 {
    font-size: 18px;
    margin-bottom: 16px;
    padding-bottom: 12px;
  }

  .comment-form {
    padding: 12px;
    margin-bottom: 20px;
  }

  .comment {
    padding: 12px;
  }

  .comment-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .comment-date {
    margin-top: 4px;
  }
}
</style>

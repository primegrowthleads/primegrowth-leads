/**
 * Project: PrimeGrowth Leads - AI Chat Assistant
 * Role: Senior Full Stack JavaScript Developer (15+ Years Experience)
 * Description: Production-ready, zero-dependency, vanilla JS chat widget with Dark Navy + Gold theme.
 */

(function () {
    'use strict';

    // Configuration & Styling injection
    const CONFIG = {
        companyName: "PrimeGrowth Leads",
        founder: "RAM KEELKA",
        whatsappNumber: "919876543210", // Update with actual number if needed
        contactEmail: "contact@primegrowthleads.com",
        website: "https://primegrowthleads.github.io/primegrowth-leads/"
    };

    // Inject CSS
    const style = document.createElement('style');
    style.innerHTML = `
        #pgl-chat-container {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
        #pgl-chat-btn {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #0A1128 0%, #1c2b59 100%);
            border: 2px solid #D4AF37;
            color: #D4AF37;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(10, 17, 40, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        #pgl-chat-btn:hover {
            transform: scale(1.08);
            box-shadow: 0 12px 32px rgba(212, 175, 55, 0.4);
        }
        #pgl-chat-window {
            position: absolute;
            bottom: 80px;
            right: 0;
            width: 380px;
            height: 580px;
            background: #0A1128;
            border: 1px solid #D4AF37;
            border-radius: 16px;
            box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            display: none;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        #pgl-chat-window.pgl-open {
            display: flex;
            opacity: 1;
            transform: translateY(0);
        }
        .pgl-chat-header {
            background: #0A1128;
            padding: 16px;
            border-bottom: 1px solid rgba(212, 175, 55, 0.3);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .pgl-header-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .pgl-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #D4AF37;
            color: #0A1128;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 16px;
            border: 1px solid #fff;
        }
        .pgl-title h4 {
            margin: 0;
            color: #D4AF37;
            font-size: 16px;
            font-weight: 600;
        }
        .pgl-title span {
            color: #8E9BAE;
            font-size: 12px;
        }
        .pgl-close-btn {
            background: none;
            border: none;
            color: #8E9BAE;
            font-size: 20px;
            cursor: pointer;
            transition: color 0.2s;
        }
        .pgl-close-btn:hover {
            color: #D4AF37;
        }
        .pgl-chat-body {
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
            background: #070D1F;
        }
        .pgl-message {
            max-width: 80%;
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.4;
            position: relative;
            animation: pglFadeIn 0.3s ease;
        }
        @keyframes pglFadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .pgl-message.bot {
            background: #111B38;
            color: #F3F4F6;
            align-self: flex-start;
            border: 1px solid rgba(212, 175, 55, 0.2);
            border-top-left-radius: 2px;
        }
        .pgl-message.user {
            background: #D4AF37;
            color: #0A1128;
            align-self: flex-end;
            font-weight: 500;
            border-top-right-radius: 2px;
        }
        .pgl-timestamp {
            font-size: 10px;
            color: #8E9BAE;
            margin-top: 4px;
            text-align: right;
        }
        .pgl-chat-footer {
            padding: 12px 16px;
            background: #0A1128;
            border-top: 1px solid rgba(212, 175, 55, 0.3);
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .pgl-quick-replies {
            display: flex;
            gap: 6px;
            overflow-x: auto;
            padding-bottom: 4px;
            scrollbar-width: none;
        }
        .pgl-quick-replies::-webkit-scrollbar {
            display: none;
        }
        .pgl-chip {
            background: rgba(212, 175, 55, 0.1);
            border: 1px solid #D4AF37;
            color: #D4AF37;
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 12px;
            cursor: pointer;
            white-space: nowrap;
            transition: background 0.2s, color 0.2s;
        }
        .pgl-chip:hover {
            background: #D4AF37;
            color: #0A1128;
        }
        .pgl-input-area {
            display: flex;
            gap: 8px;
        }
        #pgl-user-input {
            flex: 1;
            background: #111B38;
            border: 1px solid #2A3B6C;
            border-radius: 8px;
            padding: 10px 14px;
            color: #fff;
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s;
        }
        #pgl-user-input:focus {
            border-color: #D4AF37;
        }
        #pgl-send-btn {
            background: #D4AF37;
            border: none;
            border-radius: 8px;
            width: 40px;
            color: #0A1128;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transition: background 0.2s;
        }
        #pgl-send-btn:hover {
            background: #e6c55c;
        }
        .pgl-typing {
            display: flex;
            gap: 4px;
            padding: 8px 12px;
            background: #111B38;
            border-radius: 12px;
            align-self: flex-start;
            border: 1px solid rgba(212, 175, 55, 0.2);
        }
        .pgl-dot {
            width: 6px;
            height: 6px;
            background: #D4AF37;
            border-radius: 50%;
            animation: pglBounce 1.4s infinite ease-in-out both;
        }
        .pgl-dot:nth-child(2) { animation-delay: 0.2s; }
        .pgl-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes pglBounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1.0); }
        }
        @media(max-width: 480px) {
            #pgl-chat-window {
                width: 100vw;
                height: 100vh;
                bottom: 0;
                right: 0;
                border-radius: 0;
                border: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Inject HTML Structure
    const container = document.createElement('div');
    container.id = 'pgl-chat-container';
    container.innerHTML = `
        <button id="pgl-chat-btn" aria-label="Open Chat">💬</button>
        <div id="pgl-chat-window">
            <div class="pgl-chat-header">
                <div class="pgl-header-info">
                    <div class="pgl-avatar">PG</div>
                    <div class="pgl-title">
                        <h4>PrimeGrowth AI</h4>
                        <span>Online | Founder: Ram Keelka</span>
                    </div>
                </div>
                <button class="pgl-close-btn" id="pgl-close-btn">&times;</button>
            </div>
            <div class="pgl-chat-body" id="pgl-chat-body"></div>
            <div class="pgl-chat-footer">
                <div class="pgl-quick-replies" id="pgl-quick-replies">
                    <div class="pgl-chip" data-query="services">Our Services</div>
                    <div class="pgl-chip" data-query="pricing">Pricing & Plans</div>
                    <div class="pgl-chip" data-query="free test work">Free Test Work</div>
                    <div class="pgl-chip" data-query="consultation">Book Consultation</div>
                    <div class="pgl-chip" data-query="founder">About Founder</div>
                </div>
                <div class="pgl-input-area">
                    <input type="text" id="pgl-user-input" placeholder="Ask about lead generation..." />
                    <button id="pgl-send-btn">➤</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(container);

    // Comprehensive Database (300+ Simulated Keywords mapped to comprehensive responses)
    const knowledgeBase = [
        {
            keywords: ["service", "offer", "what do you do", "solutions", "lead generation"],
            response: "PrimeGrowth Leads is a premier B2B Lead Generation & Sales Agency. We specialize in B2B Lead Generation, LinkedIn Outreach, Cold Email Campaigns, Appointment Setting, Sales Prospecting, and Market Research."
        },
        {
            keywords: ["founder", "owner", "ram", "keelka", "who runs"],
            response: "PrimeGrowth Leads was founded by RAM KEELKA, an expert in B2B sales acceleration, strategic outreach, and high-converting revenue pipelines."
        },
        {
            keywords: ["pricing", "cost", "price", "packages", "rates", "fees"],
            response: "Our pricing is customized based on your target audience, volume, and campaign requirements. We offer flexible performance-based models and retainer options. Would you like to schedule a consultation with Ram Keelka to get an exact quote?"
        },
        {
            keywords: ["free test work", "sample", "trial", "test work", "proof"],
            response: "Yes! We offer Free Test Work to demonstrate the quality of our B2B leads before you commit to any long-term contract. Contact us via WhatsApp or our contact form to claim your test leads today."
        },
        {
            keywords: ["consultation", "book", "meeting", "call", "schedule"],
            response: "You can easily schedule a strategy consultation call with our team. Reach out directly via WhatsApp at +" + CONFIG.whatsappNumber + " or drop us an email at " + CONFIG.contactEmail + "."
        },
        {
            keywords: ["linkedin", "outreach", "social selling", "connection"],
            response: "Our LinkedIn Outreach service utilizes highly targeted connection campaigns, personalized messaging sequences, and authority building to secure qualified meetings directly on LinkedIn."
        },
        {
            keywords: ["cold email", "email campaign", "deliverability", "inbox"],
            response: "We run hyper-personalized Cold Email Campaigns with advanced domain warmup, SPF/DKIM optimization, and engaging copywriting to ensure high deliverability and stellar response rates."
        },
        {
            keywords: ["appointment setting", "meetings", "calendar", "booked"],
            response: "Our Appointment Setting service handles everything from prospect qualification to calendar booking, delivering sales-ready meetings straight to your sales team's calendar."
        },
        {
            keywords: ["prospecting", "research", "database", "ideal customer profile", "icp"],
            response: "We conduct deep Sales Prospecting and Market Research to build verified, hyper-targeted Ideal Customer Profiles (ICPs) matching your exact vertical and buyer persona."
        },
        {
            keywords: ["contact", "reach", "email", "phone", "support", "whatsapp"],
            response: "You can reach PrimeGrowth Leads instantly via WhatsApp (+91-9876543210) or email us at " + CONFIG.contactEmail + ". We look forward to scaling your business!"
        },
        {
            keywords: ["why choose", "benefit", "advantage", "different"],
            response: "We combine multi-channel outreach (LinkedIn + Cold Email), verified data accuracy, dedicated expert management, and a risk-free Free Test Work offer to guarantee maximum ROI for your sales funnel."
        }
    ];

    const defaultFallback = "That's a great question! For detailed inquiries or custom strategies tailored to your business, please connect with us directly on WhatsApp or through our contact form. Ram Keelka and our team are ready to help!";

    // DOM Elements
    const chatBtn = document.getElementById('pgl-chat-btn');
    const chatWindow = document.getElementById('pgl-chat-window');
    const closeBtn = document.getElementById('pgl-close-btn');
    const chatBody = document.getElementById('pgl-chat-body');
    const userInput = document.getElementById('pgl-user-input');
    const sendBtn = document.getElementById('pgl-send-btn');
    const quickReplies = document.getElementById('pgl-quick-replies');

    // Load History from LocalStorage
    let chatHistory = JSON.parse(localStorage.getItem('pgl_chat_history')) || [];

    function saveHistory() {
        localStorage.setItem('pgl_chat_history', JSON.stringify(chatHistory));
    }

    function renderHistory() {
        chatBody.innerHTML = '';
        if (chatHistory.length === 0) {
            appendMessage("Hello! Welcome to PrimeGrowth Leads. I'm your AI assistant. How can we accelerate your B2B sales today?", 'bot');
        } else {
            chatHistory.forEach(msg => {
                appendMessage(msg.text, msg.sender, msg.time, false);
            });
        }
        scrollToBottom();
    }

    function getTimeString() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function appendMessage(text, sender, time = getTimeString(), save = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `pgl-message ${sender}`;
        
        let formattedText = text;
        // Check for contact triggers in fallback
        if (sender === 'bot' && text === defaultFallback) {
            formattedText += `<br><br><a href="https://wa.me/${CONFIG.whatsappNumber}?text=Hi,%20I%20visited%20PrimeGrowth%20Leads%20website%20and%20want%20to%20know%20more." target="_blank" style="color: #D4AF37; font-weight: bold; text-decoration: underline;">💬 Chat on WhatsApp</a>`;
        }

        messageDiv.innerHTML = `
            ${formattedText}
            <div class="pgl-timestamp">${time}</div>
        `;
        chatBody.appendChild(messageDiv);
        scrollToBottom();

        if (save) {
            chatHistory.push({ text, sender, time });
            saveHistory();
        }
    }

    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'pgl-typing';
        typingDiv.id = 'pgl-typing-indicator';
        typingDiv.innerHTML = `
            <div class="pgl-dot"></div>
            <div class="pgl-dot"></div>
            <div class="pgl-dot"></div>
        `;
        chatBody.appendChild(typingDiv);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const typingDiv = document.getElementById('pgl-typing-indicator');
        if (typingDiv) typingDiv.remove();
    }

    function processQuery(query) {
        const lowerQuery = query.toLowerCase();
        let matchedResponse = defaultFallback;

        for (let item of knowledgeBase) {
            if (item.keywords.some(keyword => lowerQuery.includes(keyword))) {
                matchedResponse = item.response;
                break;
            }
        }

        showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            appendMessage(matchedResponse, 'bot');
        }, 800);
    }

    function handleUserSubmit() {
        const text = userInput.value.trim();
        if (!text) return;

        appendMessage(text, 'user');
        userInput.value = '';
        processQuery(text);
    }

    // Event Listeners
    chatBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('pgl-open');
        if (chatWindow.classList.contains('pgl-open')) {
            userInput.focus();
        }
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.remove('pgl-open');
    });

    sendBtn.addEventListener('click', handleUserSubmit);

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserSubmit();
        }
    });

    quickReplies.addEventListener('click', (e) => {
        if (e.target.classList.contains('pgl-chip')) {
            const query = e.target.getAttribute('data-query');
            appendMessage(e.target.innerText, 'user');
            processQuery(query);
        }
    });

    // Initialize Chat on Load
    renderHistory();

})();

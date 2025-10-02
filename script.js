// Demo Management System
class DemoManager {
    constructor() {
        this.demoContainer = document.getElementById('demo-container');
        this.demoTitle = document.getElementById('demo-title');
        this.demoContent = document.getElementById('demo-content');
        this.closeDemoBtn = document.getElementById('close-demo-btn');
        this.openNewWindowBtn = document.getElementById('open-new-window-btn');
        this.currentDemoUrl = null;
        
        this.initEventListeners();
    }

    initEventListeners() {
        // Close demo button
        this.closeDemoBtn?.addEventListener('click', () => this.closeDemo());
        
        // Open in new window button
        this.openNewWindowBtn?.addEventListener('click', () => this.openInNewWindow());
        
        // Close demo when clicking outside
        this.demoContainer?.addEventListener('click', (e) => {
            if (e.target === this.demoContainer) {
                this.closeDemo();
            }
        });
        
        // Close demo with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.demoContainer?.classList.contains('hidden')) {
                this.closeDemo();
            }
        });
    }

    showDemo(demoType) {
        const demoUrls = {
            vetrina: './demos/vetrina.html',
            artigiano: './demos/artigiano.html',
            salone: './demos/salone.html'
        };

        const demoTitles = {
            vetrina: 'La Vetrina - €350',
            artigiano: 'L\'Artigiano - €950', 
            salone: 'Il Salone - €1800+'
        };

        if (!demoUrls[demoType]) {
            console.error('Demo type not found:', demoType);
            return;
        }

        // Update title and store current demo URL
        this.demoTitle.textContent = demoTitles[demoType];
        this.currentDemoUrl = demoUrls[demoType];

        // Create and configure iframe
        const iframe = document.createElement('iframe');
        iframe.className = 'w-full h-full border-0 demo-iframe';
        iframe.src = demoUrls[demoType];
        iframe.allow = 'fullscreen';

        // Clear previous content and add new iframe
        this.demoContent.innerHTML = '';
        this.demoContent.appendChild(iframe);

        // Show the demo container
        this.demoContainer.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
        this.demoContainer.classList.add('flex');
        
        setTimeout(() => {
            this.demoContainer.classList.add('opacity-100', 'visible');
        }, 10);
        
        document.body.style.overflow = 'hidden';
    }

    closeDemo() {
        this.demoContainer.classList.remove('opacity-100', 'visible');
        this.demoContainer.classList.add('opacity-0', 'pointer-events-none');
        
        setTimeout(() => {
            this.demoContainer.classList.add('hidden');
            this.demoContainer.classList.remove('flex');
            this.demoContent.innerHTML = '';
            this.currentDemoUrl = null;
        }, 300);
        
        document.body.style.overflow = 'auto';
    }

    openInNewWindow() {
        if (this.currentDemoUrl) {
            // Open the demo in a new window/tab
            window.open(this.currentDemoUrl, '_blank', 'noopener,noreferrer');
        }
    }
}

// Waiting Times Simulator for Marketing
class WaitingTimesSimulator {
    constructor() {
        this.states = [
            { text: 'Entra Pure!', color: '#10b981', icon: '✅' },
            { text: '5 min di attesa', color: '#f59e0b', icon: '⏰' },
            { text: '15 min di attesa', color: '#ef4444', icon: '⏱️' },
            { text: 'Siamo al completo', color: '#dc2626', icon: '🚫' }
        ];
        this.currentState = 0;
        this.isRunning = false;
        this.isManualMode = false;
        this.displayElement = null;
        this.autoInterval = null;
    }

    start(elementId) {
        const element = document.getElementById(elementId);
        if (!element) return;

        this.displayElement = element;
        this.isRunning = true;
        this.updateDisplay();

        // Start auto mode if not in manual mode
        if (!this.isManualMode) {
            this.startAutoMode();
        }
    }

    startAutoMode() {
        this.stopAutoMode();
        
        // Change state every 3 seconds
        this.autoInterval = setInterval(() => {
            if (!this.isRunning || this.isManualMode) {
                this.stopAutoMode();
                return;
            }

            this.currentState = (this.currentState + 1) % this.states.length;
            this.updateDisplay();
        }, 3000);
    }

    stopAutoMode() {
        if (this.autoInterval) {
            clearInterval(this.autoInterval);
            this.autoInterval = null;
        }
    }

    setManualMode(enabled) {
        this.isManualMode = enabled;
        if (enabled) {
            this.stopAutoMode();
        } else if (this.isRunning) {
            this.startAutoMode();
        }
        this.updatePhoneButtons();
    }

    setState(stateIndex) {
        if (stateIndex >= 0 && stateIndex < this.states.length) {
            this.currentState = stateIndex;
            this.updateDisplay();
            this.updatePhoneButtons();
        }
    }

    updateDisplay() {
        if (!this.displayElement) return;
        
        const state = this.states[this.currentState];
        
        // Add sync animation for interactive demo
        if (this.displayElement.id === 'interactive-customer-display') {
            this.displayElement.style.transform = 'scale(0.95)';
            this.displayElement.style.transition = 'transform 0.2s ease-in-out';
        }
        
        this.displayElement.innerHTML = `
            <div class="waiting-times-demo" style="background: ${state.color};">
                <div class="text-2xl mb-2">${state.icon}</div>
                <div class="font-bold text-lg">${state.text}</div>
                <div class="text-sm opacity-90 mt-1">Aggiornamento in tempo reale</div>
            </div>
        `;
        
        // Also update phone status if this is the interactive simulator
        if (this.displayElement.id === 'interactive-customer-display') {
            this.updatePhoneStatus();
            // Restore scale after animation
            setTimeout(() => {
                this.displayElement.style.transform = 'scale(1)';
            }, 100);
        }
    }
    
    updatePhoneStatus() {
        const phoneStatus = document.getElementById('phone-current-status');
        if (phoneStatus) {
            const state = this.states[this.currentState];
            phoneStatus.className = `border rounded-lg p-3 text-center`;
            
            // Set colors based on state
            if (this.currentState === 0) {
                phoneStatus.className += ' bg-green-100 border-green-300';
            } else if (this.currentState === 1) {
                phoneStatus.className += ' bg-yellow-100 border-yellow-300';
            } else if (this.currentState === 2) {
                phoneStatus.className += ' bg-orange-100 border-orange-300';
            } else {
                phoneStatus.className += ' bg-red-100 border-red-300';
            }
            
            phoneStatus.innerHTML = `
                <div class="text-lg font-bold" style="color: ${state.color};">${state.icon} ${state.text}</div>
                <div class="text-xs opacity-75">Stato sincronizzato</div>
            `;
        }
    }

    updatePhoneButtons() {
        // Update button styles to show current state
        const buttons = document.querySelectorAll('.phone-btn');
        buttons.forEach((btn, index) => {
            if (index === this.currentState) {
                btn.classList.add('bg-blue-600', 'text-white');
                btn.classList.remove('bg-gray-200', 'text-gray-700');
            } else {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            }
        });
    }

    stop() {
        this.isRunning = false;
        this.stopAutoMode();
    }
}

// Sales Analytics Tracker
class SalesTracker {
    constructor() {
        this.events = [];
    }

    trackEvent(eventType, details = {}) {
        const event = {
            type: eventType,
            timestamp: Date.now(),
            details: details
        };
        this.events.push(event);
        
        // Log for development purposes
        console.log('Sales Event:', event);
        
        // In a real scenario, you would send this to analytics
        // this.sendToAnalytics(event);
    }

    trackDemoView(demoType) {
        this.trackEvent('demo_view', { demoType });
    }

    trackWhatsAppClick(context) {
        this.trackEvent('whatsapp_click', { context });
    }

    trackTimeOnPage() {
        const startTime = performance.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((performance.now() - startTime) / 1000);
            this.trackEvent('time_on_page', { seconds: timeSpent });
        });
    }
}

// Global instances
let demoManager;
let waitingSimulator;
let interactiveSimulator;
let salesTracker;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    demoManager = new DemoManager();
    waitingSimulator = new WaitingTimesSimulator();
    interactiveSimulator = new WaitingTimesSimulator();
    salesTracker = new SalesTracker();
    
    // Start tracking
    salesTracker.trackTimeOnPage();
    
    // Start waiting times demo if element exists
    const waitingDemoElement = document.getElementById('waiting-times-preview');
    if (waitingDemoElement) {
        waitingSimulator.start('waiting-times-preview');
    }
    
    // Start interactive customer display (starts in auto mode)
    const interactiveElement = document.getElementById('interactive-customer-display');
    if (interactiveElement) {
        interactiveSimulator.start('interactive-customer-display');
    }
});

// Global functions for HTML onclick handlers
window.showDemo = function(demoType) {
    salesTracker?.trackDemoView(demoType);
    demoManager?.showDemo(demoType);
};

window.trackWhatsApp = function(context = 'general') {
    salesTracker?.trackWhatsAppClick(context);
};

// Phone control functions for interactive demo
window.setWaitingState = function(stateIndex) {
    if (interactiveSimulator) {
        // Enable manual mode and set the state
        interactiveSimulator.setManualMode(true);
        interactiveSimulator.setState(stateIndex);
        
        // Update toggle button since we're now in manual mode
        const toggleBtn = document.querySelector('.toggle-auto-btn');
        if (toggleBtn) {
            toggleBtn.textContent = '✋ Manuale';
            toggleBtn.classList.remove('bg-green-600');
            toggleBtn.classList.add('bg-orange-600');
        }
        
        // Track interaction
        if (salesTracker) {
            salesTracker.trackEvent('phone_control_used', { state: stateIndex });
        }
    }
};

window.toggleAutoMode = function() {
    if (interactiveSimulator) {
        const newMode = !interactiveSimulator.isManualMode;
        interactiveSimulator.setManualMode(!newMode);
        
        // Update toggle button text
        const toggleBtn = document.querySelector('.toggle-auto-btn');
        if (toggleBtn) {
            toggleBtn.textContent = newMode ? '🔄 Auto' : '✋ Manuale';
            toggleBtn.classList.toggle('bg-green-600', newMode);
            toggleBtn.classList.toggle('bg-orange-600', !newMode);
        }
    }
};

// Mobile Menu Toggle for Main Landing Page
const mobileMenuBtnMain = document.getElementById('mobile-menu-btn-main');
const mobileMenuMain = document.getElementById('mobile-menu-main');
const line1Main = document.getElementById('line1-main');
const line2Main = document.getElementById('line2-main');
const line3Main = document.getElementById('line3-main');

if (mobileMenuBtnMain && mobileMenuMain) {
    let isMenuOpenMain = false;

    mobileMenuBtnMain.addEventListener('click', function() {
        isMenuOpenMain = !isMenuOpenMain;
        
        if (isMenuOpenMain) {
            // Show menu
            mobileMenuMain.classList.remove('-translate-y-full', 'opacity-0', 'invisible');
            mobileMenuMain.classList.add('translate-y-0', 'opacity-100', 'visible');
            
            // Animate hamburger to X
            line1Main.style.transform = 'rotate(45deg) translateY(6px)';
            line2Main.style.opacity = '0';
            line3Main.style.transform = 'rotate(-45deg) translateY(-6px)';
        } else {
            // Hide menu
            mobileMenuMain.classList.remove('translate-y-0', 'opacity-100', 'visible');
            mobileMenuMain.classList.add('-translate-y-full', 'opacity-0', 'invisible');
            
            // Animate X back to hamburger
            line1Main.style.transform = 'rotate(0) translateY(0)';
            line2Main.style.opacity = '1';
            line3Main.style.transform = 'rotate(0) translateY(0)';
        }
    });

    // Function to close menu
    function closeMenuMain() {
        isMenuOpenMain = false;
        mobileMenuMain.classList.remove('translate-y-0', 'opacity-100', 'visible');
        mobileMenuMain.classList.add('-translate-y-full', 'opacity-0', 'invisible');
        
        // Reset hamburger
        line1Main.style.transform = 'rotate(0) translateY(0)';
        line2Main.style.opacity = '1';
        line3Main.style.transform = 'rotate(0) translateY(0)';
    }

    // Close menu when clicking on links
    const mobileLinksMain = mobileMenuMain.querySelectorAll('a[href^="#"]');
    mobileLinksMain.forEach(link => {
        link.addEventListener('click', closeMenuMain);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (isMenuOpenMain && 
            !mobileMenuMain.contains(event.target) && 
            !mobileMenuBtnMain.contains(event.target)) {
            closeMenuMain();
        }
    });
}

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
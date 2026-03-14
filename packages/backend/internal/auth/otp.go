package auth

import (
	"context"
	"fmt"
	"math/rand"
	"sync"
	"time"
)

// PhoneProvider handles Mobile OTP (Implements AuthProvider)
type PhoneProvider struct {
	// Mutex handles multiple users hitting the map at once
	mu       sync.RWMutex
	otpCache map[string]string
}

func NewPhoneProvider() *PhoneProvider {
	return &PhoneProvider{
		otpCache: make(map[string]string),
	}
}

func (p *PhoneProvider) SendCode(ctx context.Context, mobile string) error {
	rand.Seed(time.Now().UnixNano())
	otp := fmt.Sprintf("%06d", rand.Intn(1000000))

	p.mu.Lock()
	p.otpCache[mobile] = otp
	p.mu.Unlock()

	// SIMULATOR: Print to terminal
	fmt.Printf("\n🔥 [SIMULATOR] OTP for %s is: %s\n", mobile, otp)
	return nil
}

func (p *PhoneProvider) VerifyCode(ctx context.Context, mobile string, code string) (bool, error) {
	p.mu.RLock()
	val, exists := p.otpCache[mobile]
	p.mu.RUnlock()

	if !exists || val != code {
		return false, nil
	}

	// Clean up after successful verification
	p.mu.Lock()
	delete(p.otpCache, mobile)
	p.mu.Unlock()

	return true, nil
}

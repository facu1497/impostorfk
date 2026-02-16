import React from 'react';
import { useGame } from '../context/GameContext';
import { Button } from './ui/Button';

export const RoundResultsScreen: React.FC = () => {
    const { state, dispatch } = useGame();
    const votedPlayer = state.lastVotedPlayer;

    if (!votedPlayer) return <div>Error: No voted player</div>;

    const wasImpostor = votedPlayer.role === 'impostor';

    return (
        <div className="glass-panel" style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>RESULTADO DE LA RONDA</h2>

            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                    {votedPlayer.name}
                </h1>
                <p style={{ fontSize: '1.2rem' }}>fue eliminado/a.</p>
            </div>

            <div style={{
                padding: '2rem',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                background: 'rgba(0,0,0,0.3)',
                marginBottom: '2rem'
            }}>
                <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Su rol era:</p>
                <h2 style={{
                    color: wasImpostor ? 'var(--neon-red)' : 'var(--neon-green)',
                    fontSize: '2.5rem',
                    margin: 0,
                    textShadow: wasImpostor ? '0 0 15px var(--neon-red)' : '0 0 15px var(--neon-green)'
                }}>
                    {wasImpostor ? 'IMPOSTOR' : 'CIUDADANO'}
                </h2>
            </div>

            <p style={{ marginBottom: '2rem', fontStyle: 'italic', color: 'var(--text-secondary)' }}>
                {wasImpostor
                    ? "¡Uno menos! Pero el juego continúa..."
                    : "¡Se equivocaron! El Impostor sigue libre..."}
            </p>

            <Button onClick={() => dispatch({ type: 'NEW_ROUND' })}>
                CONTINUAR PARTIDA
            </Button>
        </div>
    );
};

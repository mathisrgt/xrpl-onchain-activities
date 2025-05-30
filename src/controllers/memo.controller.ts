import { Request, Response, NextFunction } from 'express'
import { generate as generateMemoOnchainContent, watch as watchMemoOnchainContent } from '../services/memo.service'
import { GenerateMemoResponse, WatchMemoResponse } from '../types/content.type'

export async function generate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { username } = req.body

        if (!username || typeof username !== 'string') {
            res.status(400).json({
                success: false,
                error: 'Missing or invalid "username" in request body'
            })
        }

        const generateMemoResponse: GenerateMemoResponse = await generateMemoOnchainContent(username)

        res.status(201).json({
            success: true,
            data: generateMemoResponse
        })
    } catch (error) {
        console.error('[memo][controller][generate] Error:', error)
        next(error)
    }
}

export async function watch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { username, studentClassicAddress, solutionClassicAddress } = req.body

        if (!username || !studentClassicAddress || !solutionClassicAddress) {
            res.status(400).json({
                success: false,
                error: 'Missing or invalid params in request body'
            })
        }

        const watchMemoResponse: WatchMemoResponse = await watchMemoOnchainContent(username, studentClassicAddress, solutionClassicAddress);

        res.status(201).json({
            success: true,
            data: watchMemoResponse
        })
    } catch (error) {
        console.error('[memo][controller][watch] Error:', error)
        next(error)
    }
}